"""Mini-analyseur JS : calcule, pour chaque début de ligne, la pile d'imbrication
(accolades/parenthèses/crochets) et si on est dans une chaîne/un gabarit/un commentaire."""
import re

KW_BEFORE_REGEX = {'return', 'typeof', 'instanceof', 'in', 'of', 'new', 'delete', 'void',
                   'throw', 'case', 'do', 'else', 'yield', 'await'}


def line_states(src, on_id=None):
    """Renvoie une liste (par ligne) de (profondeur, stack_str, ok) au DÉBUT de la ligne.
    ok=False si la ligne commence à l'intérieur d'une chaîne, d'un gabarit ou d'un commentaire."""
    i, n = 0, len(src)
    stack = []          # éléments : '{', '(', '[', '${'  (ouverture d'expression de gabarit)
    states = []
    mode = None         # None, 'tpl', 'bc' (block comment)
    tpl_stack = []      # profondeur de stack à laquelle chaque gabarit a été ouvert
    last = ''           # dernier jeton significatif ('id:xxx', 'num', 'op:x', 'str', 'regex')
    line_start = True
    while i < n:
        if line_start:
            states.append((len(stack), ''.join(s[0] for s in stack), mode is None))
            line_start = False
        c = src[i]
        if mode == 'bc':
            if src.startswith('*/', i):
                mode = None; i += 2; continue
            if c == '\n': line_start = True
            i += 1; continue
        if mode == 'tpl':
            if c == '\\': i += 2; continue
            if c == '`':
                mode = None; tpl_stack.pop(); last = 'str'; i += 1; continue
            if src.startswith('${', i):
                stack.append('${'); mode = None; i += 2; last = 'op:{'; continue
            if c == '\n': line_start = True
            i += 1; continue
        # code normal
        if c == '\n':
            line_start = True; i += 1; continue
        if c in ' \t\r':
            i += 1; continue
        if src.startswith('//', i):
            j = src.find('\n', i)
            i = n if j < 0 else j
            continue
        if src.startswith('/*', i):
            mode = 'bc'; i += 2; continue
        if c in '\'"':
            j = i + 1
            while src[j] != c:
                if src[j] == '\\': j += 1
                if src[j] == '\n': raise SyntaxError('chaîne non fermée ligne %d' % (src.count('\n', 0, i) + 1))
                j += 1
            i = j + 1; last = 'str'; continue
        if c == '`':
            mode = 'tpl'; tpl_stack.append(len(stack)); i += 1; continue
        if c == '/':
            regex_ok = (last == '' or last.startswith('op:') and last not in ('op:)', 'op:]', 'op:}')
                        or (last.startswith('id:') and last[3:] in KW_BEFORE_REGEX))
            if regex_ok:
                j = i + 1; cls = False
                while True:
                    ch = src[j]
                    if ch == '\\': j += 2; continue
                    if ch == '\n': raise SyntaxError('regex non fermée ligne %d' % (src.count('\n', 0, i) + 1))
                    if cls:
                        if ch == ']': cls = False
                    elif ch == '[': cls = True
                    elif ch == '/': break
                    j += 1
                j += 1
                while j < n and (src[j].isalnum()): j += 1
                i = j; last = 'regex'; continue
            i += 1; last = 'op:/'; continue
        if c in '{([':
            stack.append(c); last = 'op:' + c; i += 1; continue
        if c in '})]':
            if not stack: raise SyntaxError('fermeture en trop ligne %d' % (src.count('\n', 0, i) + 1))
            top = stack.pop()
            if top == '${':
                if c != '}': raise SyntaxError('gabarit mal fermé')
                mode = 'tpl'; i += 1; continue
            pair = {'{': '}', '(': ')', '[': ']'}[top]
            if pair != c: raise SyntaxError('mauvaise fermeture %s/%s ligne %d' % (top, c, src.count('\n', 0, i) + 1))
            last = 'op:' + c; i += 1; continue
        m = re.compile(r'[A-Za-z_$À-￿][\w$À-￿]*').match(src, i)
        if m:
            if on_id: on_id(src.count(chr(10), 0, i), len(stack), m.group(), src[m.end():m.end()+40])
            last = 'id:' + m.group(); i = m.end(); continue
        m = re.compile(r'\d[\d_]*\.?\d*(e[+-]?\d+)?|\.\d+(e[+-]?\d+)?', re.I).match(src, i)
        if m:
            last = 'num'; i = m.end(); continue
        last = 'op:' + c; i += 1
    if stack or mode:
        raise SyntaxError('fin de fichier avec pile %r mode %r' % (stack, mode))
    return states
