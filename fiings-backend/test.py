from pdfminer.pdfparser import PDFParser
from pdfminer.psparser import PSLiteral  # edit: fixed typo
from pdfminer.pdfdocument import PDFDocument
from pdfminer.pdftypes import resolve1, PDFObjRef

path = "C:/Users/hrint/Documents/filings_app/filings-app/fiings-backend/pdf_example.pdf"
# pdf_reader = PdfFileReader(open( path, "rb"))

# dictionary = pdf_reader.getFormTextFields() 
# print(dictionary)    

fp = open(path, 'rb')
data = {}
parser = PDFParser(fp)
doc = PDFDocument(parser)
fields = resolve1(doc.catalog['AcroForm'])['Fields']
for i in fields:
    field = resolve1(i)
    name, value = field.get('T'), field.get('V')
    if isinstance(name, PSLiteral):
        name = name.name

    if isinstance(value, PDFObjRef):
        value = resolve1(value)
        
    if isinstance(value, PSLiteral):
        value = value.name
    else:
        value = str(value, encoding='ISO-8859-1')
        
    data[name.decode('ascii')] = str(value)
data_dict = {
    'First name': data['Given Name Text Box'],
    'Last name' : data['Family Name Text Box'],
    'House no' : data['House nr Text Box'],
    'Address' : data['Address 1 Text Box'],
    'Post Code' : data['Postcode Text Box'],
    'Country' : data['Country Combo Box'],
    'City' : data['City Text Box'],
    'Favorite color' : data['Family Name Text Box'],
    'Driving Licence' : data['Driving License Check Box'],
}
print(data_dict)
