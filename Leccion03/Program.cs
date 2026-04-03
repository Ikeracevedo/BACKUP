// Clase en C#

var envio = new Envio();
envio.Id = 1;
envio.Origen = "Medellin";
envio.Destino = "Bogota";
envio.Peso = 2.5m;
envio.Activo = true;

Console.WriteLine($"Envio #{envio.Id}");
Console.WriteLine($"De: {envio.Origen} -> {envio.Destino}");
Console.WriteLine($"Peso: {envio.Peso}");
Console.WriteLine($"Estado: {(envio.Activo ? "Activo" : "Inactivo")}");
Console.WriteLine(envio.ObtenerResumen());

// Clase envio
public class Envio
{
    public int Id { get; set; }
    public string Origen { get; set; } = string.Empty;
    public string Destino { get; set; } = string.Empty;
    public decimal Peso { get; set; }
    public bool Activo { get; set; }
    public DateTime  FechaCreacion { get; set; } = DateTime.Now;

    public string ObtenerResumen()
    {
        return $"Envio #{Id} | {Origen} -> {Destino} | Peso: {Peso}kg";
    }
}