from django.http import HttpResponse
import datetime

#Definicion de la vista 
def saludo(request):
    texto = """
    <html>
    <body>
    <h1>Hola como vas</h1>
    </body>
    </html>
    """
    return HttpResponse(texto)

def fecha(request):
    miFecha = datetime.datetime.now()
    texto2 = """
    <html>
    <body>
    <h2>Fecha y hora actual: </h2>%s
    </body>
    </html>
    """ % miFecha
    return HttpResponse(texto2)

def calularEdad(request, edadActual, year):
    periodo = year - 2024
    edadFutura = edadActual+periodo
    documento = """<html>
        <body>
        <h2>En el año %s tendras %s años </h2>
        </html>'
        """%(year,edadFutura)
    return HttpResponse(documento)


