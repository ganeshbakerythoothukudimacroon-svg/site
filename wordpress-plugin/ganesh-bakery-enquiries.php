<?php
/**
 * Plugin Name: Ganesh Bakery — Website Enquiries
 * Description: Stores Contact Us and Bulk Order form submissions from the
 *              website as a private "Enquiry" record in wp-admin, and
 *              exposes a dedicated REST endpoint so the Next.js site can
 *              save new ones. Not visible anywhere on the public site.
 * Version: 1.1.0
 * Author: Ganesh Bakery
 */

if (!defined('ABSPATH')) {
    exit;
}

add_action('init', function () {
    register_post_type('gb_enquiry', [
        'label' => 'Enquiries',
        'labels' => [
            'name' => 'Enquiries',
            'singular_name' => 'Enquiry',
            'menu_name' => 'Enquiries',
            'all_items' => 'All Enquiries',
        ],
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'menu_icon' => 'dashicons-email-alt',
        'supports' => ['title'],
        'capability_type' => 'post',
    ]);
});

// A dedicated endpoint rather than the generic wp/v2 post-meta REST schema —
// this writes with plain wp_insert_post()/update_post_meta() calls, so it
// doesn't depend on WordPress's REST meta registration working correctly
// (which turned out to be unreliable on this host/setup).
add_action('rest_api_init', function () {
    register_rest_route('gb/v1', '/enquiry', [
        'methods' => 'POST',
        'callback' => 'gb_create_enquiry',
        'permission_callback' => function () {
            return current_user_can('edit_posts');
        },
    ]);
});

function gb_create_enquiry(WP_REST_Request $request) {
    $name = sanitize_text_field((string) $request->get_param('name'));
    $contact = sanitize_text_field((string) $request->get_param('contact'));
    $message = sanitize_textarea_field((string) $request->get_param('message'));
    $form_type = sanitize_text_field((string) $request->get_param('form_type'));
    $form_type = $form_type === 'bulk-order' ? 'bulk-order' : 'contact';

    if ($name === '' || $contact === '' || $message === '') {
        return new WP_Error('gb_missing_fields', 'name, contact, and message are required.', ['status' => 400]);
    }

    $post_id = wp_insert_post([
        'post_type' => 'gb_enquiry',
        'post_title' => sprintf('%s enquiry from %s', $form_type === 'bulk-order' ? 'Bulk Order' : 'Contact', $name),
        'post_status' => 'publish',
    ], true);

    if (is_wp_error($post_id)) {
        return $post_id;
    }

    update_post_meta($post_id, 'gb_contact', $contact);
    update_post_meta($post_id, 'gb_message', $message);
    update_post_meta($post_id, 'gb_form_type', $form_type);

    return new WP_REST_Response(['id' => $post_id], 201);
}

// Show the enquiry details on the edit-post screen so they're readable at
// a glance in wp-admin. Reads via get_post_meta() directly (not REST), so
// this works regardless of the REST meta-schema issue above.
add_action('add_meta_boxes', function () {
    add_meta_box('gb_enquiry_details', 'Enquiry Details', function ($post) {
        $contact = get_post_meta($post->ID, 'gb_contact', true);
        $message = get_post_meta($post->ID, 'gb_message', true);
        $form_type = get_post_meta($post->ID, 'gb_form_type', true);
        echo '<p><strong>Form:</strong> ' . esc_html($form_type ?: 'contact') . '</p>';
        echo '<p><strong>Contact:</strong> ' . esc_html($contact) . '</p>';
        echo '<p><strong>Message:</strong><br>' . nl2br(esc_html($message)) . '</p>';
    }, 'gb_enquiry');
});
