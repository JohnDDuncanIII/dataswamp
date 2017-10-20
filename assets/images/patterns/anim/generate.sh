echo "<!DOCTYPE html>" > index.html
echo "<html>" >> index.html
echo "<head>" >> index.html
echo "<link rel=\"stylesheet\" type=\"text/css\" href=\"../../styles/no_aa.css\" charset=\"utf-8\">" >> index.html
echo "<title>Pattern Images</title>" >> index.html
echo "</head>" >> index.html
echo "<body>" >> index.html
echo "<h1>Patterns</h1>" >> index.html

for img in *.gif ; do
     echo $img
     echo "<a href=\"$img\"><img src=\"$img\"></a>" >> index.html
done

echo "</body>" >>index.html
echo "</html>" >>index.html
