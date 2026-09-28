Client.init(
{
  tipo_documento: {
    type: DataTypes.STRING,
    allowNull:false
  },

  numero_documento:{
    type: DataTypes.STRING,
    allowNull:false,
    unique:true
  },

  nombre:{
    type: DataTypes.STRING,
    allowNull:false
  },

  telefono:{
    type: DataTypes.STRING
  },

  email:{
    type: DataTypes.STRING,
    unique:true
  },

  status:{
    type: DataTypes.ENUM(
      "active",
      "inactive"
    ),
    defaultValue:"active"
  }
},
{
  sequelize,
  tableName:"clients",
  timestamps:true
}
);
