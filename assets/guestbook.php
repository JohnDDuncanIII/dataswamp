<?php
ini_set(session.save_path, '/Accounts/turing/students/s17/duncjo01/session/');
session_save_path('/Accounts/turing/students/s17/duncjo01/session/'); session_start(); ?>
<!DOCTYPE html>
<head>
  <meta charset="UTF-8">
  <title>Guestbook</title>
  <link rel="icon" href="../favicon.ico">
  <link rel="stylesheet" href="styles/style.css">
  <link rel="stylesheet" href="scripts/guestbook/style.css">
  <script src="scripts/border.js"></script>
  <style>
    @media only screen and (min-width:1075px) { html { max-width: none; } }
  </style>
</head>
<body class="content">
  <div id="guestbook-content" style="overflow: hidden;position: relative;">
    <center>
      <!-- <img src="images/jolifond.gif"> -->
      <div id="ichingcoins" style="background-image: url('images/iching/iching_background.gif')" title="i-ching"></div>
      <h1 style="margin-top: 5px;margin-bottom: 5px;">Guestbook</h1> <hr />
    </center>
    <?php include 'scripts/guestbook/index.php';?>
    <footer>
      <hr>
      <a href="about.html">about</a> <BR>
      You are visitor number <a href="https://stuff.mit.edu/doc/counter-howto.html"><img src="http://www.mit.edu/cgi/counter/jduncan" style="vertical-align:middle"></a> <BR>
      <i> <a href="mailto:duncanjdiii@gmail.com?Subject=I would like to speak to your manager">  © 2016 John D. Duncan, III <br> <img id="mail"  src="images/mail.gif"></a> <BR> </i>
      <a href="http://vanilla-js.com/"> <img id="vanilla" src="images/banners/button.gif"></a>
      <br>
      <a href="https://www.anybrowser.org/campaign/index.html"> <img id="anyBrowser"></a>
    </footer>
  </div>
  <script src="scripts/anybrowser.js"></script>
</body>

