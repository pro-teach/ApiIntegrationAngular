using System.ComponentModel.DataAnnotations;

namespace RestApiClass7to9TTS.Model
{
    public class Department
    {
        [Key]
        public int ID { get; set; }

        public string Name { get; set; }
    }
}
