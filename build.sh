#!/usr/bin/env bash

pwd=`pwd`
BUILD_NAME="./dist"

ENV=$2

clear() {
    cd $pwd
    if [ -d $BUILD_NAME ]; then
        rm -rf $BUILD_NAME
    fi
}
# 编译主题
cd $pwd
clear

npm run build || exit 1

cd $BUILD_NAME

tar zcvf output.tar.gz `ls .` > /dev/null 2>&1


echo "All Build Completed"
