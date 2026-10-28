"""Portable regression fixture for the DOCX editorial importer."""
import importlib.util
from pathlib import Path
import tempfile
import unittest
import zipfile

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('docx_import', ROOT / 'scripts/lib/docx-to-markdown.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)


class DocxImportTest(unittest.TestCase):
    def test_structure_links_tables_and_lists(self):
        ns = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
        with tempfile.TemporaryDirectory() as directory:
            source = Path(directory) / 'fixture.docx'
            with zipfile.ZipFile(source, 'w') as archive:
                archive.writestr('word/styles.xml', f'<w:styles xmlns:w="{ns}"><w:style w:styleId="Title"><w:name w:val="Title"/></w:style></w:styles>')
                archive.writestr('word/_rels/document.xml.rels', '<Relationships><Relationship Id="link" Target="https://example.org/programme"/></Relationships>')
                archive.writestr('word/document.xml', f'''<w:document xmlns:w="{ns}" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><w:body>
                <w:p><w:pPr><w:pStyle w:val="Title"/></w:pPr><w:r><w:t>Christmas guide</w:t></w:r></w:p>
                <w:p><w:pPr><w:pStyle w:val="Heading2"/></w:pPr><w:r><w:t>Where to go</w:t></w:r></w:p>
                <w:p><w:hyperlink r:id="link"><w:r><w:t>Programme</w:t></w:r></w:hyperlink></w:p>
                <w:p><w:pPr><w:numPr/></w:pPr><w:r><w:t>Check the return</w:t></w:r></w:p>
                <w:tbl><w:tr><w:tc><w:p><w:r><w:t>Place</w:t></w:r></w:p></w:tc></w:tr><w:tr><w:tc><w:p><w:r><w:t>Menton</w:t></w:r></w:p></w:tc></w:tr></w:tbl>
                </w:body></w:document>''')
            result = module.convert(source)
            for expected in ['# Christmas guide', '## Where to go', '[Programme](https://example.org/programme)', '- Check the return', '| Place |\n| --- |\n| Menton |']:
                self.assertIn(expected, result)


if __name__ == '__main__':
    unittest.main()
