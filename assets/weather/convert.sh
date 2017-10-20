for f in `find . -name "*.xbm"`
do
    convert $f $f"_bw.gif"
done
