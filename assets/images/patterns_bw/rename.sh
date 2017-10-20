a=149
for i in *.png; do
  new=$(printf "%d.gif" "$a") #04 pad to length of 4
  mv -- "$i" "$new"
  let a=a+1
done
