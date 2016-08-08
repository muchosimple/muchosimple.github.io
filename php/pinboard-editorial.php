<?php include "header.php"; ?>

  <div class="main cf" role="main" aria-live="polite">

    <div class="lc cf">
      <div class="pin-head cf">
        <div class="primary">
          <div class="primary-inner">
            <div class="unify">
              <h2 class="lead-subtitle">Coming up with a quick, satisfying meal can feel like a real chore—and one that you have to do over and over again. But with these trusted chicken recipes, you can cross meal planning off of your to-do list for good.</h2>
              <?php include "article-tools.php"; ?>
            </div> <!-- /.unify -->
          </div> <!-- /.primary-inner -->
        </div> <!-- /.primary -->

        <div class="secondary no-pad-top">
          <div class="ad-block ad-300x250 block">
            <span class="upper text--tiny center t-sans light">Advertisement</span>
            <a href=""><img src="http://s1.2mdn.net/viewad/3521978/SINS_WebBanner_300x250.jpg"></a>
          </div> <!-- /.ad-300x250 -->
        </div> <!-- /.secondary -->
      </div> <!-- /.pin-head -->

      <div class="pin-content rel">

        <?php
          $request_board = 'https://api.pinterest.com/v1/boards/46232402363738208/pins/?access_token=AZ1t-Nb0yUV7e24V0Q1Tq9a2_c_VE_Ir-reDVD9CVf4N1WAa5QAAAAA&fields=id,url,note,image[500x]&limit=100';
          $board_content = file_get_contents($request_board);
          $board_json = json_decode($board_content, true);
        ?>
          <div class="grid cf g-4up">

            <?php
              foreach($board_json['data'] as $board_item):
                $pin_url = $board_item['url'];
                $pin_note = $board_item['note'];
                $pin_img = $board_item['image']['500x']['url'];

                $note_words = preg_split('/\s+/', $pin_note);

                $pin_tags = array('#breakfast', '#snack');
                $selected_tags = "";

                foreach($note_words as $word) {
                  if (in_array(strtolower($word), $pin_tags)) {
                    $selected_tags .= strtolower(str_replace('#', 'filter--', $word)) . " ";
                  }
                }
            ?>

            <div class="grid-item <?php print $selected_tags; ?>">
              <a href="<?php print $pin_url; ?>"><img src="<?php print $pin_img; ?>?file=text" alt="<?php print $pin_note; ?>"></a>
                <a href="<?php print $pin_url; ?>" class="no-bg icon rounded icon-pinterest icon--medium"><svg xmlns="http://www.w3.org/2000/svg" viewBox="146 290 500 500" enable-background="new 146 290 500 500"><title>Pinterest</title><path fill="#fff" d="M224.6 475.6c0 45.1 16.6 85.2 52.1 100.3 5.8 2.5 11.1.1 12.7-6.6 1.1-4.6 4-16.3 5.2-21.1 1.8-6.6 1-8.9-3.7-14.6-10.2-12.4-16.8-28.6-16.8-51.5 0-66.3 48-125.6 125.1-125.6 68.3 0 105.8 43 105.8 100.5 0 75.6-32.5 139.5-80.6 139.5-26.6 0-46.5-22.7-40.1-50.5 7.6-33.2 22.5-69.1 22.5-93 0-21.5-11.2-39.4-34.3-39.4-27.2 0-49 29-49 67.9 0 24.8 8.1 41.6 8.1 41.6S303.9 644.5 299 665.8c-9.7 42.4-1.5 94.4-.7 99.6.4 3.1 4.3 3.9 6.1 1.6 2.5-3.3 34.9-44.6 45.8-85.8 3.1-11.6 17.9-72.1 17.9-72.1 8.9 17.3 34.7 32.7 62.1 32.7 81.8 0 137.2-76.9 137.2-179.8 0-77.8-63.9-150.3-160.9-150.3-120.9 0-181.9 89.4-181.9 163.9z"/></svg>
              </a>
            </div> <!-- /.grid-item -->
            <?php endforeach; ?>
          </div> <!-- /.grid -->

        <div class="powered-by space-btm">
          <a href="http://pinterest.com">
            <span class="black text--s upper">Powered By</span><br>
            <img src="../images/svg/compressed/logo-pinterest.svg" alt="Pinterest logo">
          </a>
        </div> <!-- /.powered-by -->

      </div> <!-- .pin-content -->

    </div> <!-- /.lc -->
  </div> <!-- /role=main -->

<?php include "footer.php"; ?>
