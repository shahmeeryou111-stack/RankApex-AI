f = open("script.js", "r", encoding="utf-8").read()
old = """        out.classList.remove('hidden');
        }, 2000);
      }
    },"""
new = """        out.classList.remove('hidden');
      }
    },"""
f = f.replace(old, new)
open("script.js", "w", encoding="utf-8").write(f)
