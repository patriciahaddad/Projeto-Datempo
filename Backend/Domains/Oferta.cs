using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domains
{
    [Table("oferta")]
    public partial class Oferta
    {
        public Oferta()
        {
            Reserva = new HashSet<Reserva>();
        }

        [Key]
        public int IdOferta { get; set; }
        //[Required]
        [StringLength(255)]
        public string NomeOferta { get; set; }
        //[Required]
        [StringLength(255)]
        public string Marca { get; set; }
        public int QuantVenda { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime Validade { get; set; }
        [Column(TypeName = "money")]
        public decimal Preco { get; set; }
        //[Required]
        [StringLength(255)]
        public string Imagem { get; set; }
        //[Required]
        [StringLength(255)]
        public string Descricao { get; set; }
        public int? IdUsuario { get; set; }
        public int? IdProduto { get; set; }

        [ForeignKey(nameof(IdProduto))]
        [InverseProperty(nameof(Produto.Oferta))]
        public virtual Produto IdProdutoNavigation { get; set; }
        [ForeignKey(nameof(IdUsuario))]
        [InverseProperty(nameof(Usuario.Oferta))]
        public virtual Usuario IdUsuarioNavigation { get; set; }
        [InverseProperty("IdOfertaNavigation")]
        public virtual ICollection<Reserva> Reserva { get; set; }
    }
}
