<?php

namespace WPKirk\Ajax;

use WPKirk\WPBones\Foundation\WordPressAjaxServiceProvider as ServiceProvider;

class MyAjax extends ServiceProvider
{
  /**
   * List of the ajax actions executed by both logged and not logged users.
   * Here you will use a methods list.
   *
   * @var array
   */
  protected $trusted = ['trusted'];

  /**
   * List of the ajax actions executed only by logged-in users.
   * Here you will use a methods list.
   *
   * @var array
   */
  protected $logged = ['logged'];

  /**
   * List of the ajax actions executed only by not logged-in user, usually from frontend.
   * Here you will use a methods list.
   *
   * @var array
   */
  protected $notLogged = ['notLogged'];

  /**
   * The capability required to execute the action.
   * Of course, this is only for logged-in users.
   *
   * @var string
   */
  protected $capability = 'manage_options';

  /**
   * The nonce key used to verify the request.
   *
   * @var string
   */
  protected $nonceKey = 'nonce';

  /**
   * The nonce hash used to verify the request.
   *
   * @var string
   */
  protected $nonceHash = 'wp-kirk-mantine';

  public function trusted()
  {
    $response = 'You have clicked Ajax Trusted';

    wp_send_json($response);
  }

  public function logged()
  {
    $response = [
      [
        'id' => 1,
        'name' => 'Joe Biden',
        'bornIn' => 1942,
        'party' => 'Democratic',
      ],
      [
        'id' => 2,
        'name' => 'Donald Trump',
        'bornIn' => 1946,
        'party' => 'Republican',
      ],
      [
        'id' => 3,
        'name' => 'Barack Obama',
        'bornIn' => 1961,
        'party' => 'Democratic',
      ],
      [
        'id' => 4,
        'name' => 'George W. Bush',
        'bornIn' => 1946,
        'party' => 'Republican',
      ],
      [
        'id' => 5,
        'name' => 'Bill Clinton',
        'bornIn' => 1946,
        'party' => 'Democratic',
      ],
    ];

    wp_send_json($response);
  }

  public function notLogged()
  {
    $response = 'You have clicked Ajax notLogged';

    wp_send_json($response);
  }
}
