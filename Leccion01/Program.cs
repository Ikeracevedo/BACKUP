
string nombre = "Iker";
string tecnologiaDondeVengo = "Angular";
string tecnologiaAprender = ".NET expert";
int experiencia = 12;
string resultado = "";

Console.WriteLine($"Mi nombre es: {nombre}");
Console.WriteLine($"Vengo de: {tecnologiaDondeVengo}");
Console.WriteLine($"Voy hacia: {tecnologiaAprender}");
Console.WriteLine($"Años de experiencia en FrontEnd: {experiencia}");
Console.WriteLine($"Listo para el BackEnd?");
resultado = Console.ReadLine() ?? "Di que si";

if (resultado == "si")
{
    Console.WriteLine("Genial iniciemos");
}
else
{
    Console.WriteLine("Di que si");
}

