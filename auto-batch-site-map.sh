#!/bin/bash

# Armazena o nome do arquivo fornecido
file="./project_input/project_name.txt"

# Verifica se o arquivo existe
if [ ! -f "$file" ]; then
    echo "Erro ao ler o projeto."
    exit 1
fi

# Lê a primeira linha do arquivo e armazena em uma variável
projectName=$(head -n 1 "$file")

# Define o caminho da pasta reports
reportsFolder="./project_output/$projectName/reports"

# Verifica se a pasta reports não existe
if [ ! -d "$reportsFolder" ]; then
    # Cria a pasta reports
    mkdir -p "$reportsFolder"
fi

siteMapFolder="./project_input/"$projectName"/site_map"

if [ ! -d "$siteMapFolder" ]; then
    echo "A pasta $siteMapFolder não existe."
    exit 1
fi

siteMapFiles=$(find "$siteMapFolder" -type f -name "*.xml")

for file in $siteMapFiles; do
  fileName=$(basename "$file" .xml)
  npm run cli -- -np -p "$file" -d ./project_output/"$projectName"/reports/"$fileName"/
done
