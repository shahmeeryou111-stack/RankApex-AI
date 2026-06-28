f = open("script.js", "r", encoding="utf-8").read()
depth = 0
in_string = False
string_char = ""
in_comment = False
in_line_comment = False
for i, c in enumerate(f):
    if not in_comment and not in_line_comment and not in_string:
        if c == '"' or c == "'" or c == '`':
            in_string = True
            string_char = c
        elif c == '/' and i+1 < len(f) and f[i+1] == '*':
            in_comment = True
        elif c == '/' and i+1 < len(f) and f[i+1] == '/':
            in_line_comment = True
        elif c == '{':
            depth += 1
        elif c == '}':
            depth -= 1
            if depth < 0:
                print(f"Extra closing brace found at offset {i}, line {f[:i].count(chr(10))+1}")
                break
    elif in_string:
        if c == string_char and f[i-1] != '\\':
            in_string = False
        elif c == string_char and f[i-1] == '\\' and f[i-2] == '\\':
            in_string = False
    elif in_line_comment:
        if c == '\n':
            in_line_comment = False
    elif in_comment:
        if c == '/' and f[i-1] == '*':
            in_comment = False
print(f"Final depth: {depth}")
