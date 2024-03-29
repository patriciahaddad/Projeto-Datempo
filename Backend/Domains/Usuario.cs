﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Backend.Domains
{
    [Table("usuario")]
    public partial class Usuario
    {
        public Usuario()
        {
            Endereco = new HashSet<Endereco>();
            Oferta = new HashSet<Oferta>();
            Reserva = new HashSet<Reserva>();
        }

        [Key]
        public int IdUsuario { get; set; }
        [Required]
        [StringLength(255)]
        public string Nome { get; set; }
        [Required]
        [StringLength(255)]
        public string Email { get; set; }
        [Required]
        [StringLength(255)]
        public string Senha { get; set; }
        [StringLength(14)]
        public string Identificador { get; set; }
        public int? IdTipoUsuario { get; set; }
        [Column("imgusuario")]
        [StringLength(255)]
        public string Imgusuario { get; set; }

        [ForeignKey(nameof(IdTipoUsuario))]
        [InverseProperty(nameof(Tipousuario.Usuario))]
        public virtual Tipousuario IdTipoUsuarioNavigation { get; set; }
        [InverseProperty("IdUsuarioNavigation")]
        public virtual ICollection<Endereco> Endereco { get; set; }
        [InverseProperty("IdUsuarioNavigation")]
        public virtual ICollection<Oferta> Oferta { get; set; }
        [InverseProperty("IdUsuarioNavigation")]
        public virtual ICollection<Reserva> Reserva { get; set; }
    }
}
