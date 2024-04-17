#!/bin/bash

# Solicita um nome ao usuário
echo "Digite o nome do projeto, por exemplo, 'projeto_hagens':"
read name

# Cria as pastas necessárias para o projeto
mkdir -p ./project_input/"$name"/site_map
mkdir -p ./project_output/"$name"

# Nome do arquivo
file="./project_input/project_name.txt"

# Cria o arquivo e escreve o nome do projeto nele
echo "$name" > "$file"

# Verifica se o arquivo foi criado com sucesso
if [ $? -eq 0 ]; then
    echo "O projeto '$name' foi criado com sucesso!"
else
    echo "Erro ao criar o projeto '$name'."
    exit 1
fi

# Verifica se a pasta foi criada com sucesso
if [ -d "./project_input/$name" ]; then
    echo "Pasta '$name' criada com sucesso!"
    echo "Adicione os arquivos de site map em './project_input/$name/site_map'"
else
    echo "Erro ao criar a pasta '$name'."
fi
