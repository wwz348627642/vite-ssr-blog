#!/bin/sh
set -e

gitIsmerged () {
  # 获取pkg版本并转换小写
  PKG_VERSION=`node -p "require('./package.json').version"`
  
  echo PKG_VERSION = $PKG_VERSION

  result=$(echo "${PKG_VERSION}" | grep -i "release") || { echo "not release version"; exit 0; }

  if [[ -z "$result" ]]

  then
   # 打的不是release版本
   echo current version is not release version
   exit 0;
  fi

  # 当前分支
  destination_branch=$(git rev-parse --abbrev-ref HEAD)

  source_branch=$1


  # 寻找合并的共同祖先
  base=$(git merge-base $destination_branch $source_branch)
  # 最新的提交
  source_current_commit=$(git rev-parse $source_branch)
  
  # echo source_current_commit is $source_current_commit


  if [[ $base = $source_current_commit ]]

  then

    echo $source_branch is merged into $destination_branch
    # 已经合并则进行打包

  else

    echo $source_branch is not merged into $destination_branch
    echo 你当前在分支上打release，没有合并最新的master，请先合并
    # 非零退出
    exit 1

  fi

}

gitIsmerged 'origin/master'