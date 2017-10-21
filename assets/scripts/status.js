/* Copyright (C)1996 Web Integration Systems, Inc. DBA Websys, Inc.

   All Rights Reserved.

   This applet can be re-used or modified, if credit is given in
   the source code.

   We will not be held responsible for any unwanted effects due to the
   usage of this applet or any derivative.  No warrantees for usability
   for any specific application are given or implied.

   Chris Skinner, January 30th, 1996.
*/

function scrollit_r2l(seed) {
    var m1  = "Welcome to my webpage!";
    var m2  = " Feel free to a look around,";
    var m3  = " and maybe stay awhile";
    var msg = m1 + m2 + m3;
    var out = " ";
    var c   = 1;

    if (seed > 100) {
        seed--;
        var cmd="scrollit_r2l(" + seed + ")";
        timerTwo=window.setTimeout(cmd,100);
    }
    else if (seed <= 100 && seed > 0) {
        for (c = 0 ; c < seed ; c++) {
            out += " ";
        }
        out += msg;
        seed--;
        var cmd = "scrollit_r2l(" + seed + ")";
        window.status = out;
        timerTwo = window.setTimeout(cmd,100);
    }
    else if (seed <= 0) {
        if (-seed < msg.length) {
            out += msg.substring(-seed, msg.length);
            seed--;
            var cmd = "scrollit_r2l(" + seed + ")";
            window.status = out;
            timerTwo = window.setTimeout(cmd, 100);
        }
        else {
            window.status=" ";
            timerTwo=window.setTimeout("scrollit_r2l(100)",75);
        }
    }
}

function titleScroller(text) {
    document.title = text;
    setTimeout(function () {
        titleScroller(text.substr(1) + text.substr(0, 1));
    }, 500);
};

titleScroller(" John D. Duncan III's Homepage ");
