import hashlib

# Convertir le bloc de Blocks en une chaîne de caractères
Blocks = """
██  ██   ██████╗
██  ██   ██├─╦─╝ 
██  ██   ████|
██  ██   ██╔─╝
██  ██   ██| 
██  ██   ╚─╝ 
██  ██
████████████████████
"""
# Calculer le hash MD5 du bloc de Blocks
hash_object = hashlib.md5()
hash_object.update(Blocks.encode('utf-8'))
hash_value = hash_object.hexdigest()

print("Hash du bloc de Blocks du Playeur : ", hash_value)
