// Tipos basicos C#

string nombre = "Iker";
char inicial = 'I';
int experiencia = 12;
long idUsuario = 987654321098765L;
double temperatura = 35.6;
decimal tarifaEnvio = 15750.99m;
bool envioActivo = true;
DateTime fechaPedido = DateTime.Now;

// Mostrando datos
Console.WriteLine($"Nombre: {nombre}");
Console.WriteLine($"Incial: {inicial}");
Console.WriteLine($"Experiencia: {experiencia} años");
Console.WriteLine($"ID Usuario: {idUsuario}");
Console.WriteLine($"Temperatura: {temperatura}");
Console.WriteLine($"Tarifa de envio: {tarifaEnvio}");
Console.WriteLine($"Envio activo: {envioActivo}");
Console.WriteLine($"Fecha pedido: {fechaPedido}");


// Reto 

string pesoTexto = "2500";
decimal multiplicador = 0.05m;

int.TryParse(pesoTexto, out int pesoNumero); // Si falla la converison dejo un 0

decimal costo = pesoNumero * multiplicador;

Console.WriteLine($"Costo de envio por peso: {costo}");


