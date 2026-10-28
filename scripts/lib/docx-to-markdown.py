"""Read editorial DOCX structure without executing document content."""
import json
import sys
import zipfile
import xml.etree.ElementTree as ET

W = '{http://schemas.openxmlformats.org/wordprocessingml/2006/main}'
R = '{http://schemas.openxmlformats.org/officeDocument/2006/relationships}'


def convert(filename):
    with zipfile.ZipFile(filename) as archive:
        def xml(name):
            info = archive.getinfo(name)
            if info.file_size > 20_000_000:
                raise ValueError('DOCX XML exceeds the import limit')
            return ET.fromstring(archive.read(name))

        relationships = {}
        if 'word/_rels/document.xml.rels' in archive.namelist():
            for rel in xml('word/_rels/document.xml.rels'):
                target = rel.get('Target', '')
                if target.startswith(('https://', 'http://')):
                    relationships[rel.get('Id')] = target
        styles = {}
        if 'word/styles.xml' in archive.namelist():
            for style in xml('word/styles.xml').findall(W + 'style'):
                name = style.find(W + 'name')
                styles[style.get(W + 'styleId')] = name.get(W + 'val', '') if name is not None else ''

        def inline(element):
            if element.tag == W + 't':
                return element.text or ''
            if element.tag == W + 'tab':
                return ' '
            if element.tag == W + 'br':
                return ' '
            value = ''.join(inline(child) for child in element)
            if element.tag == W + 'hyperlink':
                target = relationships.get(element.get(R + 'id'))
                return f'[{value}]({target})' if target and value else value
            return value

        def paragraph(element):
            value = inline(element).strip()
            if not value:
                return ''
            style = element.find('./' + W + 'pPr/' + W + 'pStyle')
            name = styles.get(style.get(W + 'val'), style.get(W + 'val')) if style is not None else ''
            compact = name.lower().replace(' ', '')
            if compact == 'title':
                return '# ' + value
            if compact.startswith('heading') and compact[7:].isdigit():
                return '#' * min(6, int(compact[7:])) + ' ' + value
            if element.find('./' + W + 'pPr/' + W + 'numPr') is not None:
                return '- ' + value
            return value

        blocks = []
        for element in xml('word/document.xml').find(W + 'body'):
            if element.tag == W + 'p':
                value = paragraph(element)
                if value:
                    blocks.append(value)
            elif element.tag == W + 'tbl':
                rows = [[ ' '.join(inline(p).strip() for p in cell.findall(W + 'p')).replace('|', '\\|') for cell in row.findall(W + 'tc')] for row in element.findall(W + 'tr')]
                if rows:
                    width = max(map(len, rows))
                    rows = [row + [''] * (width - len(row)) for row in rows]
                    render = lambda row: '| ' + ' | '.join(row) + ' |'
                    blocks.append('\n'.join([render(rows[0]), render(['---'] * width), *[render(row) for row in rows[1:]]]))
        return '\n\n'.join(blocks) + '\n'


if __name__ == '__main__':
    sys.stdout.write(convert(sys.argv[1]))
