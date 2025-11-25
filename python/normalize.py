import json
from pathlib import Path
import re

MAPA_NORMALIZACAO = {
    # Pimentas
    "pimenta preta em grão 05kg": "Pimenta Preta Em Grão",
    "pimenta preta em grão (meia-caixa)": "Pimenta Preta Em Grão",

    # Páprica
    "páprica defumada 10kg": "Páprica Defumada",
    "páprica defumada (caixa)": "Páprica Defumada",

    # Erva Doce
    "erva doce (sem icms) 05kg": "Erva Doce",
    "erva doce (quilo)": "Erva Doce",

    # Canjica
    "canjica branca 15kg": "Canjica Branca",
    "canjica branca (quilo)": "Canjica Branca",

    # Catuaba
    "catuaba em pó 10kg": "Catuaba em Pó",
    "catuaba em pó (quilo)": "Catuaba em Pó",

    # Colorau
    "colorau 10kg": "Colorau",
    "colorau paraíba (quilo)": "Colorau",

    # Farinha de Uva
    "farinha de uva 05kg": "Farinha de Uva",
    "farinha de uva (meia-caixa)": "Farinha de Uva",

    # Guaraná
    "guaraná em pó 10kg": "Guaraná em Pó",
    "guaraná em pó (caixa)": "Guaraná em Pó",

    # Linhaça
    "farinha de linhaça marrom crua nacional 05kg": "Farinha de Linhaça Marrom",
    "farinha de linhaça marrom (meia-caixa)": "Farinha de Linhaça Marrom",

    # Feijão Preto
    "feijão preto nacional brilhado 05kg": "Feijão Preto",
    "feijão preto (meia-caixa)": "Feijão Preto",
}


def normalizar_nome(nome):
    nome_lower = nome.lower().strip()

    if nome_lower in MAPA_NORMALIZACAO:
        return MAPA_NORMALIZACAO[nome_lower]

    # fallback: remove números, pesos, e normaliza texto
    nome_sem_peso = re.sub(r"\d+(kg|g|quilo|caixa|meia-caixa)", "", nome_lower)
    return nome_sem_peso.strip().title()


input_path = Path(__file__).parent / "scraped-prices.json"
raw = json.load(open(input_path, "r", encoding="utf-8"))

produtos = {}

for item in raw:
    nome_original = item["name"]
    fornecedor = item["supplier"]
    preco = item["price"]

    nome_normalizado = normalizar_nome(nome_original)

    if nome_normalizado not in produtos:
        produtos[nome_normalizado] = {
            "id": nome_normalizado,
            "name": nome_normalizado,
            "suppliers": []
        }

    produtos[nome_normalizado]["suppliers"].append({
        "name": fornecedor,
        "location": "Online",
        "price": preco,
        "url": (
            "https://pedidos.gramore.com.br/precos.php"
            if fornecedor == "Gramore"
            else "https://ibericacomercio.com/tabela-precos-produtos-naturais/"
        )
    })

# transformar em lista
saida = list(produtos.values())

# salvar
output_path = Path(__file__).parent / "products-normalized.json"
with open(output_path, "w", encoding="utf-8") as f:
    json.dump(saida, f, ensure_ascii=False, indent=2)

print("✅ Arquivo products-normalized.json gerado!")
