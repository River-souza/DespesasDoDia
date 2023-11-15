let contas = {
    adm: {
        nome: "maicom",
        cod: "00001242",
        senha: "root_23Er"
    },
    usuarios: [
{
    num_conta: 1,
    despesas: [
{
    id: 1,
    valor: 12.12,
    desc: 'mantimentos',
    data: '2023-10-25',
    hora: '10:20',
    tipo: 1, //alimentação
    obs: 'Foi passado no cartão de crédito',
    pago: true,
    parc: false
},
{
    id: 2,
    valor: 24.50,
    desc: 'remédios para dor de caveça',
    data: '2023-09-11',
    hora: '16:42',
    tipo: 5, //saúde
    obs: 'Foi pago à vista',
    pago: true,
    parc: false
}, 
{
    id: 3,
    valor: 300.57,
    desc: 'capacete',
    data: '2023-10-14',
    hora: '20:02',
    tipo: 5, //aquisição de bens
    obs: 'Foi pago no cartão parcelado em 2x',
    pago: true,
    parc: true 
}],
    receitas: [],
    saldo: [{
        saldo_seguro: 0,
        saldo_total_despesas: 0
}]
}
    ]
}

module.exports = contas;