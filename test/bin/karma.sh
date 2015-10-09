!/bin/sh

version=$(node -v)
v=`expr match "$version" '\(v[0-9]*[.][0-9]*\)'`
if [ $v = "v0.12" ]
then
    karma start karma-sauce.conf.js
fi
exit 0;

