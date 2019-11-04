using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domains
{
    [Table("categoria")]
    public partial class Categoria
    {
        public Categoria()
        {
            Produto = new HashSet<Produto>();
        }

        [Key]
        public int IdCategoria { get; set; }
        [Required]
        [StringLength(255)]
        public string NomeCategoria { get; set; }

        [InverseProperty("IdCategoriaNavigation")]
        public virtual ICollection<Produto> Produto { get; set; }
    }
}
