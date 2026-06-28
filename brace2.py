f = open("script.js", "r", encoding="utf-8").read()
depth = 0
in_str = False
str_char = ""

i = 0
while i < len(f):
    c = f[i]
    if not in_str:
        if c in ['"', "'", '`']:
            in_str = True
            str_char = c
        elif c == '/' and i+1 < len(f) and f[i+1] == '*':
            i = f.find("*/", i+2)
            if i == -1: break
            i += 1
        elif c == '/' and i+1 < len(f) and f[i+1] == '/':
            i = f.find("\n", i+2)
            if i == -1: break
        elif c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth < 0:
                print(f"Negative depth at index {i}")
                break
    else:
        if c == '\\':
            i += 1
        elif c == str_char:
            in_str = False
        elif str_char == '`' and c == '$' and i+1 < len(f) and f[i+1] == '{':
            # recursive template literal!
            # we need to track { inside ` `
            # Actually, this is too hard for simple regex.
            pass
    i += 1

print(f"Final depth: {depth}")
