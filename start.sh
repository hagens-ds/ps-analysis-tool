#!/bin/bash

# Solicita um nome ao usuário
echo "Digite o nome do projeto, por exemplo, 'projeto_hagens':"
read name

# Cria a pasta com o nome fornecido pelo usuário
mkdir ./project_input
mkdir ./project_output
mkdir ./project_input/"$name"
mkdir ./project_input/"$name"/site_map

# Verifica se a pasta foi criada com sucesso
if [ $? -eq 0 ]; then
    echo "Pasta '$name' criada com sucesso!"
    echo "Adicione os arquivos de site map em './project_input/"$name"/site_map'"
else
    echo "Erro ao criar a pasta '$nome'."
fi
