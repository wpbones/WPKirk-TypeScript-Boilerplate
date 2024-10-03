<?php

namespace WPKirk\Http\Controllers\Dashboard;

use WPKirk\Http\Controllers\Controller;

class DashboardController extends Controller
{
  public function index()
  {
    return WPKirk()
      ->view('dashboard.index')
      ->withAdminAppsScript('app', true)
      ->withInlineScript('app', 'const WPKirkMantine = ' . json_encode(['nonce' => wp_create_nonce('wp-kirk-mantine')]) . ';', 'before');
  }
}
