using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Models
{
    [Table("reserva")]
    public partial class Reserva
    {
        [Key]
        public int IdReserva { get; set; }
        public int QuantCompra { get; set; }
        [Column(TypeName = "datetime")]
        public DateTime DataReserva { get; set; }
        [Column("PIN")]
        public int Pin { get; set; }
        public int? IdOferta { get; set; }
        public int? IdUsuario { get; set; }

        [ForeignKey(nameof(IdOferta))]
        [InverseProperty(nameof(Oferta.Reserva))]
        public virtual Oferta IdOfertaNavigation { get; set; }
        [ForeignKey(nameof(IdUsuario))]
        [InverseProperty(nameof(Usuario.Reserva))]
        public virtual Usuario IdUsuarioNavigation { get; set; }
    }
}
