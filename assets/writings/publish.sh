#!/bin/sh
# Simple script to publish blogs
# Example usage: ./publish.sh "Header Title" inputFile.txt
# Created by John D. Duncan, III
FILENAME=$(cat counter.txt)'_'$(echo $1 | awk '{print tolower($1);}')'.html';
echo $FILENAME
INFILE=$(sed -re '
s/$/<br>/; # replace newline with <br>
s/\t/\&emsp;\&emsp;\&emsp;/g;
s/&/\\&/g; # ampersand fixes
s/>>(.*)\.<br>/<\/p><blockquote>\1\. <\/blockquote><p>/g;  # replace > .* \.<br> with blockquote
s/\*\*([a-zA-Z0-9[:space:]_]+)\*\*/<b>\1<\/b>/g;  # replace ** with <b>
s/\_\_([a-zA-Z0-9[:space:]_]+)\_\_/<b>\1<\/b>/g;  # replace __ with <b>
s/\~\~([a-zA-Z0-9[:space:]_]+)\~\~/<s>\1<\/s>/g;  # replace ~~ with <s>
s/```([a-zA-Z0-9[:space:]_]+<br>)/<code>\1/g;
s/([a-zA-Z0-9[:space:]_]+)```<br>/\1<\/code>/g;
s/`(.*)`/<code>\1<\/code>/g;  # replace ` with <code>
s/---/<\/p><hr><p>/g;  # replace --- with <hr>
s/\*\*\*/<\/p><hr><p>/g;  # replace *** with <hr>
s/\-\_([a-zA-Z0-9[:space:]_]+)\_\-/<small>\1<\/small>/g;  # replace -_ .* _- with <small>
s/\#\#([a-zA-Z0-9[:space:]_]+)\#\#/<u>\1<\/u>/g;  # replace ## with <u>
s/\%\%(.*)\%\%/<mark>\1<\/mark>/g;  # replace %% with <mark>
s/\_\{([a-zA-Z0-9[:space:]_,]+)\}/<sub>\1<\/sub>/g;  # replace _{} with <sub>
s/\^\{([a-zA-Z0-9[:space:]_,]+)\}/<sup>\1<\/sup>/g;  # replace ^{} with <sup>
s/\_([a-zA-Z0-9[:space:]_]+)\_/<i>\1<\/i>/g; # replace _ with <i>
s/\*([a-zA-Z0-9[:space:]_]+)\*/<i>\1<\/i>/g; # replace * with <i>
s/\!\[(.*)\]\((.*)\)/<img src=\2 alt=\1>/g;  # markdown url (force unwrap image)
s/\[(.*)\]\((.*)\)/<a href=\2>\1<\/a>/g;  # markdown url
s/\[(.*)\]<([a-zA-Z0-9[:space:]_,]*)>/<abbr title="\2">\1<\/abbr>/g;  # replace []<> with <abbr>
s|[[:space:]](http[:]//[^ ]*[a-zA-Z])[[:space:]]| <a href=\"\1\">\1</a> |g;  # replace urls with html urls
s|https[:]\/\/www.youtube.com\/watch\?v=([a-zA-Z0-9_]*)|<object style="width:100%;height:100%;width:420px;height:315px;float:none;clear:both;margin:2px auto;" data="http:\/\/www.youtube.com\/embed\/\1"><\/object>|g;
s|\w+@\w+\.\w+(\.\w+)?|<a href=\"mailto:\0\">\0</a>|g;s/\//\\\//g' $2);  # replace tab with &emsp;

sed "s/\(<h1>\)/\1$1/; # add header title
s/\(<time>\)/\1$(date +'%A, %B %d %Y - %I:%M:%S %p')/ # add date to footer
s/\(<p>\)/\1$(echo $INFILE)/" template.html > $FILENAME; # add it all back into the new document
sed -i 's/<br>/<br>\n/g' $FILENAME;
sed -i 's/######\(.*\)<br>/<\/p><h6>\1<\/h6><p>/g;
s/#####\(.*\)<br>/<\/p><h5>\1<\/h5><p>/g;
s/####\(.*\)<br>/<\/p><h4>\1<\/h4><p>/g;
s/###\(.*\)<br>/<\/p><h3>\1<\/h3><p>/g;
s/##\(.*\)<br>/<\/p><h2>\1<\/h2><p>/g;
s/#\(.*\)<br>/<\/p><h1>\1<\/h1><p>/g;
s/|\([a-zA-Z0-9[:space:]_,$\*\/<>-]*\)*/<td>\1<\/td>/g;
s/<td><br><\/td>/<br>/g;
s/<td><\/td>//g;
s/\(<td>.*<\/td>\)\(<br>\)*/<tr>\1<\/tr>/g;
s/:\(<tr>\)/<\/p><table>\n\1/g;
s/\(<\/tr>\):/\1\n<\/table><p>/g;
s/\-\(.*\)\.<br>/<li>\1\. <\/li>/g;
s/::\(<li>\)/<\/p><ul>\n\1/g;
s/\(<li>\)::\(.*\)/\1\2\n<\/ul><p>/g;
s/[0-9]\+\.\(.*\)\.<br>/<li>\1\. <\/li>/g;
s/\;\;\(<li>\)/<\/p><ol>\n\1/g;
s/\(<li>\)\;\;\(.*\)/\1\2\n<\/ol><p>/g;
s/:\(<li>\)/<ul>\n\1/g;
s/\(<li>\):\(.*\)/\1\2\n<\/ul>/g;' $FILENAME; # physically break newlines to easily match tables
# match markdown-extended formatted tables: | col 1 | col 2 | etc... |
sed -i 's/<\/p>/<\/p>\n/g;
s/<p><br>/<p>/g;
s/<p>/\n<p>\n/g;
s/<code>/\n<code>\n/g;
s/<\/code>/\n<\/code>\n/g;
' $FILENAME;
sed -i '/^\s*$/d' $FILENAME;

#sed -n '1h; 1!H; ${g; s/\(<tr>.*<\/tr>\)/<\/p><table>\0<\/table><p>/g p}' $FILENAME > $FILENAME.tmp && mv $FILENAME.tmp $FILENAME; # insert the table tags around the entire inserted table block -- see http://www.refining-linux.org/archives/27/20-Multi-line-sed-search-and-replace/ for explanation
#sed -n '1h; 1!H; ${g; s/```\(.*\)```/<code>\0<\/code>/g p}' $FILENAME > $FILENAME.tmp && mv $FILENAME.tmp $FILENAME;

emacs -batch $FILENAME --eval '(indent-region (point-min) (point-max) nil)' -f save-buffer # LISP to properly indent the inserted HTML
rm $FILENAME~;
chmod 644 $FILENAME; # make readable
echo $((`cat counter.txt`+1)) > counter.txt; # write this out to the file

TABLEROW=$(echo "<TR>?<TD><a href="$FILENAME">$1<\/a><\/TD>?<TD>$(date +"%A, %B %d %Y - %I:%M:%S %p")<\/TD>?<\/TR>" | sed -e $'s/?/\\\n/g'); # add the post to the index's table
sed -i "s/<time>\(.*\)<\/time>/<time>Modified: $(date +'%A, %B %d %Y - %I:%M:%S %p')<\/time>/;
/\(<table id=\"writings\"\)/a $TABLEROW" index.html; # update timestamp
emacs -batch index.html --eval '(indent-region (point-min) (point-max) nil)' -f save-buffer # LISP to properly indent the inserted HTML
rm index.html~;
