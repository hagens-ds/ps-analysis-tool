#!/bin/bash
projectName="projeto_uam"
siteMapFolder="./project_input/"$projectName"/site_map"

if [ ! -d "$siteMapFolder" ]; then
    echo "A pasta $siteMapFolder não existe."
    exit 1
fi

siteMapFiles=$(find "$siteMapFolder" -type f -name "*.xml")

for arquivo in $siteMapFiles; do
  fileName=$(basename "$arquivo" .xml)
  npm run cli -- -np -p "$arquivo" -d ./project_output/"$projectName"/reports/"$fileName"/
done
