using System.ComponentModel.DataAnnotations;

namespace RestApiClass7to9TTS.Model
{
    public class Employeee
    {

        [Key]
        public int ID { get; set; }

        public string Name { get; set; }

        public string Department  { get; set; }

        public  string Designition { get; set; }
    }
}
