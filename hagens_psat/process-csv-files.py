import os
import pandas as pd
import re
import sys

def list_all_files(dir, pattern, dfs_cookies_issues, dfs_cookies):
    for current_folder, subfolder, files in os.walk(dir):
        for file in files:
            if file.endswith('cookies-issues.csv'):
              file_path = os.path.join(current_folder, file).replace("\\", "/")
              try:
                df = pd.read_csv(file_path)
                df['page_path'] = re.sub(pattern, "", file_path)
                dfs_cookies_issues.append(df)
              except:
                print('Não foi possível ler', file_path)
                continue
            if file.endswith('cookies.csv'):
              file_path = os.path.join(current_folder, file).replace("\\", "/")
              try:
                df = pd.read_csv(file_path)
                df['page_path'] = re.sub(pattern, "", file_path)
                dfs_cookies.append(df)
              except:
                print('Não foi possível ler', file_path)
                continue


project_name = sys.argv[1]
# project_name = "projeto_teste"
dir = f"../project_output/{project_name}/reports/"
pattern = r"./project_output/[^/]+/reports/"
dfs_cookies_issues = []
dfs_cookies = []
list_all_files(dir, pattern, dfs_cookies_issues, dfs_cookies)
df_final_issues_cookies = pd.concat(dfs_cookies_issues, ignore_index=True)
df_final_cookies = pd.concat(dfs_cookies, ignore_index=True)
df_final_issues_cookies.to_csv(f"../project_output/{project_name}/{project_name}_final_issues_cookies.csv", index=False)
df_final_cookies.to_csv(f"../project_output/{project_name}/{project_name}_final_cookies.csv", index=False)
print(f"Foram criados dois arquivos csv's, o primeiro contendo todos os cookies e o segundo somente com os cookies com problema. O caminho para acessar os arquivos são:\n")
print(f"1 - ../project_output/{project_name}/{project_name}_final_cookies.csv")
print(f"2 - ../project_output/{project_name}/{project_name}_final_issues_cookies.csv")
