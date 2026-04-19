<!--
 |
 | In $plugin you'll find an instance of Plugin class.
 | If you'd like can pass variable to this view, for example:
 |
 | return PluginClassName()->view( 'dashboard.index', [ 'var' => 'value' ] );
 |
-->

<?php ob_start() ?>

<div class="wp-kirk wrap wp-kirk-sample">

  <div class="wp-kirk-toc-content">

    <?php wpkirk_section(__('Live Demo', 'wp-kirk')); ?>

    <div id="react-app"></div>

    <?php wpkirk_section(__('TypeScript Showcase', 'wp-kirk')); ?>
    <p>
      <?= esc_html__(
        'The module below groups the TypeScript patterns this boilerplate demonstrates: interfaces, discriminated unions, generics, type guards, and utility types. Each export is used by the React entry above.',
        'wp-kirk'
      ) ?>
    </p>
    <?php wpkirk_code('@/resources/assets/js/ts-showcase.ts'); ?>

    <?php wpkirk_section(__('React Entry', 'wp-kirk')); ?>
    <?php wpkirk_code('@/resources/assets/apps/app.tsx'); ?>

    <?php wpkirk_section(__('Jest Test', 'wp-kirk')); ?>
    <?php wpkirk_code('@/resources/assets/apps/__tests__/ts-showcase.test.ts'); ?>

    <?php wpkirk_section(__('tsconfig.json', 'wp-kirk')); ?>
    <?php wpkirk_code('@/tsconfig.json'); ?>

    <?php wpkirk_section(__('Package.json', 'wp-kirk')); ?>
    <?php wpkirk_code('@/package.json'); ?>

    <?php wpkirk_section(__('Controller', 'wp-kirk')); ?>
    <?php wpkirk_code('@/plugin/Http/Controllers/Dashboard/DashboardController.php'); ?>

    <?php wpkirk_section(__('Developing', 'wp-kirk')); ?>
    <?php wpkirk_code('yarn dev', ['language' => 'sh']); ?>

    <?php wpkirk_section(__('Build', 'wp-kirk')); ?>
    <?php wpkirk_code('yarn build', ['language' => 'sh']); ?>

    <?php wpkirk_section(__('Test', 'wp-kirk')); ?>
    <?php wpkirk_code('yarn test', ['language' => 'sh']); ?>

  </div>

  <?php wpkirk_toc('TypeScript') ?>

</div>
