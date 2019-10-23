using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("endereco")]
    public partial class Endereco
    {
        [Key]
        public int IdEndereco { get; set; }
        [Required]
        [Column("CEP")]
        [StringLength(8)]
        public string Cep { get; set; }
        [Required]
        [StringLength(255)]
        public string Numero { get; set; }
        [StringLength(255)]
        public string Complemento { get; set; }
        public int? IdUsuario { get; set; }

        [ForeignKey(nameof(IdUsuario))]
        [InverseProperty(nameof(Usuario.Endereco))]
        public virtual Usuario IdUsuarioNavigation { get; set; }
    }
}
