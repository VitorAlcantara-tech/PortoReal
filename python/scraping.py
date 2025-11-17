from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import re
import json
from pathlib import Path


# =============================
# FUNÇÃO GAMORE
# =============================
def scrape_gramore(produtos_procurados, supplier="Gramore"):
    options = Options()
    options.add_argument("--headless")

    driver = webdriver.Chrome(options=options)
    driver.get("https://pedidos.gramore.com.br/precos.php")

    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")
    trs = soup.find_all("tr")

    resultados = []

    for produto_procurado in produtos_procurados:
        preco = None
        linha_encontrada = None

        for tr in trs:
            tds = [td.get_text(strip=True) for td in tr.find_all("td")]
            if not tds:
                continue

            texto_linha = " ".join(tds)

            if produto_procurado.lower() in texto_linha.lower():
                linha_encontrada = tds

                for campo in tds:
                    # ignora peso (5,00 kg, 10 kg, etc.)
                    if "kg" in campo.lower():
                        continue

                    m = re.search(r"(\d{1,3}(?:\.\d{3})*,\d{2})", campo)
                    if m:
                        preco_str = m.group(1)
                        preco = float(preco_str.replace(".", "").replace(",", "."))
                        break

                break

        if linha_encontrada and preco:
            resultados.append({
                "id": str(len(resultados) + 1),
                "name": produto_procurado,
                "supplier": supplier,
                "price": round(preco, 2),
            })

    driver.quit()
    return resultados


# =============================
# FUNÇÃO IBERICA
# =============================
def scrape_iberica(produtos_procurados, supplier="Iberica"):
    options = Options()
    options.add_argument("--headless")

    driver = webdriver.Chrome(options=options)
    driver.get("https://ibericacomercio.com/tabela-precos-produtos-naturais/")

    # espera aparecer qualquer célula de produto
    WebDriverWait(driver, 20).until(
        EC.presence_of_element_located(
            (By.CSS_SELECTOR, "td.ninja_clmn_nm_produto")
        )
    )

    html = driver.page_source
    soup = BeautifulSoup(html, "html.parser")

    # pega as linhas da tabela (linhas do Ninja Tables)
    trs = soup.select("tr[class^='ninja_table_row_']")

    resultados = []

    for produto_procurado in produtos_procurados:
        preco = None
        linha_encontrada = None

        for tr in trs:
            # nome do produto
            td_nome = tr.select_one("td.ninja_clmn_nm_produto")
            if not td_nome:
                continue

            nome_produto = td_nome.get_text(strip=True)

            if produto_procurado.lower() in nome_produto.lower():
                linha_encontrada = nome_produto

                # === NOVO: procura qualquer preço na linha ===
                for td in tr.find_all("td"):
                    campo = td.get_text(strip=True)
                    # aceita "R$ 56,93", "56,93", "1.234,56" etc.
                    m = re.search(r"R?\$?\s*(\d{1,3}(?:\.\d{3})*,\d{2})", campo)
                    if m:
                        preco_str = m.group(1)
                        preco = float(
                            preco_str.replace(".", "").replace(",", ".")
                        )
                        break  # achou um preço, sai do loop de tds

                break  # achou o produto, sai do loop de trs

        if not linha_encontrada:
            print(f"❌ Produto NÃO encontrado na Ibérica: {produto_procurado}")
            continue

        if preco is None:
            # debug extra pra você ver o que veio na linha
            print(f"⚠️ Produto encontrado mas sem preço válido: {produto_procurado}")
            # opcional: mostrar os campos da linha pra inspecionar
            # for td in tr.find_all("td"):
            #     print("   TD:", td.get_text(strip=True))
            continue


        resultados.append({
            "id": str(len(resultados) + 1),
            "name": produto_procurado,
            "supplier": supplier,
            "price": round(preco, 2),
        })

    driver.quit()
    return resultados




# =============================
# EXECUÇÃO UNIFICADA
# =============================

if __name__ == "__main__":
    
    produtos_gramore = [
        "Pimenta Preta em Grão 05KG",
        "Páprica Defumada 10KG",
        "Erva Doce (SEM ICMS) 05KG",
        "Canjica Branca 15KG",
        "Catuaba em Pó 10KG",
        "Colorau 10KG",
        "Farinha de Uva 05KG",
        "Guaraná em Pó 10KG",
        "Farinha de Linhaça Marrom Crua NACIONAL 05KG",
        "Feijão Preto Nacional Brilhado 05KG",
    ]

    produtos_iberica = [
        "PIMENTA PRETA EM GRÃO (MEIA-CAIXA)",
        "PÁPRICA DEFUMADA (CAIXA)",
        "ERVA DOCE (QUILO)",
        "CANJICA BRANCA (QUILO)",
        "CATUABA EM PÓ (QUILO)",
        "COLORAU PARAÍBA (QUILO)",
        "FARINHA DE UVA (MEIA-CAIXA)",
        "GUARANÁ EM PÓ (CAIXA)",
        "FARINHA DE LINHAÇA MARROM (MEIA-CAIXA)",
        "FEIJÃO PRETO (MEIA-CAIXA)",
    ]

    # scraping
    lista_gramore = scrape_gramore(produtos_gramore)
    lista_iberica = scrape_iberica(produtos_iberica)

    # junta os dois
    resultados_finais = lista_gramore + lista_iberica

    # salva no JSON
    output_path = Path(__file__).parent / "scraped-prices.json"
    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(resultados_finais, f, ensure_ascii=False, indent=2)

    print(f"\n📦 Produtos salvos no JSON:")
    print(f" - Gramore: {len(lista_gramore)} itens")
    print(f" - Iberica: {len(lista_iberica)} itens")
    print(f" - Total: {len(resultados_finais)} itens")
    print("\n✅ scraped-prices.json gerado com sucesso!")

