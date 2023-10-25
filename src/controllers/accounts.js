const db = require('../../database');
//const banco = db.banco;
let usuarios = db.usuarios;
//let accountant = db.accountant;

const criarConta = (req, res) => {
    const { nome, cpf, data_nascimento, telefone, email, senha } = req.body;

    if(!nome) {
        return res.status(400).json({ mensagem: 'O nome é obrigatório '});
    }
    if(!cpf) {
        return res.status(400).json({ mensagem: 'O cpf é obrigatório '});
    }
    if(!data_nascimento) {
        return res.status(400).json({ mensagem: 'A data de nascimento é obrigatório '});
    }
    if(!telefone) {
        return res.status(400).json({ mensagem: 'O telefone é obrigatório '});
    }
    if(!email) {
        return res.status(400).json({ mensagem: 'O email é obrigatório '});
    }
    if(!senha) {
        return res.status(400).json({ mensagem: 'A senha é obrigatório '});
    }

    const cpfUnico = contas.find((conta) => {
        return conta.usuario.find((obj) => {
             return obj.cpf === cpf;
            });
	});


    if(cpfUnico) {
        return res.status(400).json({ mensagem: 'O CPF informado já existe cadastrado.' });
    }

    const emailUnico = contas.find((conta) => {
        return conta.usuario.find((obj) => {
             return obj.email === email;
            });
	});

    if(emailUnico) {
        return res.status(400).json({ mensagem: 'O Email informado já existe cadastrado.' });
    }

    const conta = {
        numero_conta: accountant++,
		usuario: [
		           {
						nome : nome, 
						cpf : cpf, 
						data_nascimento: data_nascimento, 
						telefone: telefone,
						email: email, 
						senha: senha
				   }
				 ],
		saldo: 0
	}

    contas.push(conta);

    contas.accountant = accountant;//atualiza o identificado do banco de dados para próximas inclusões

    return res.status(201).json(conta);
}

const listarUsuarios = (req, res) => {
/*    const { senha_banco } = req.query;

    if(!senha_banco) {
        return res.status(404).json({ mensagem: 'A senha do banco informada é inválida!'});
    }

    if(!(banco.senha === senha_banco)) {
        return res.status(404).json({ mensagem: 'A senha do banco informada é inválida!'});
    }
*/
   if(Number(res.statusCode) === 200) {
        return res.json(usuarios);
    }
    return res.status(404).json({ mensagem: 'Usuarios não encontrados!'}); //se a conta não for encontrada
}

const obterConta = (req, res) => {
    const { numero_conta } = req.params;
/*
    if(isNaN(Number(numero_conta))) {
        return res.status(400).json({ mensagem: 'Número da conta é inválido!' });
    }
*/
    const conta = contas.find((conta) => {
        return Number(conta.numero_conta) === Number(numero_conta);
    });

    if(!conta) {
        return res.status(404).json({ mensagem: 'Conta bancária não encontrada!'}); //se a conta não for encontrada
    }
    return res.status(200).json(conta);
}

const atualizarConta = (req, res) => {
    const { numero_conta } = req.params; 
    const { nome, cpf, data_nascimento, telefone, email, senha} = req.body;
/*
    if(isNaN(Number(numero_conta))) {
        return res.status(400).json({ mensagem: 'Número da conta é inválido!' });
    }
*/
    const conta = contas.find((conta) => {
        return Number(conta.numero_conta) === Number(numero_conta);
    });

    if(!conta) {
        return res.status(404).json({ mensagem: 'Conta não encontrada.' });
    }

    //Validações
    if(!nome) {
        return res.status(400).json({ mensagem: 'O nome é obrigatório '});
    }
    if(!cpf) {
        return res.status(400).json({ mensagem: 'O cpf é obrigatório '});
    }
    if(!data_nascimento) {
        return res.status(400).json({ mensagem: 'A data de nascimento é obrigatório '});
    }
    if(!telefone) {
        return res.status(400).json({ mensagem: 'O telefone é obrigatório '});
    }
    if(!email) {
        return res.status(400).json({ mensagem: 'O email é obrigatório '});
    }
    if(!senha) {
        return res.status(400).json({ mensagem: 'A senha é obrigatório '});
    }

     let usuariosConta = [];

	 contas.find((conta) => {
        return conta.usuario.find((obj) => {
			if(Number(conta.numero_conta) == Number(numero_conta)) {
			usuariosConta.push(obj);
            }	
		});
	});
	
	const cpfUnico = contas.find((conta) => {
        return conta.usuario.find((obj) => {
			if(Number(conta.numero_conta) != Number(numero_conta)) {
             return obj.cpf === cpf;
            }
		});
	});
     
	if(cpfUnico) {
        return res.status(400).json({ mensagem: 'O CPF informado já existe cadastrado.' });
    }

    conta.usuario[0].cpf = cpf;//trata o usuario que está no top no array

    const emailUnico = contas.find((conta) => {
        return conta.usuario.find((obj) => {
			if(Number(conta.numero_conta) != Number(numero_conta)) {
             return conta.email === email;
            }
		});
	});

    if(emailUnico) {
        return res.status(400).json({ mensagem: 'O Email informado já existe cadastrado.' });
    }
			
	conta.usuario[0].email = email;//trata o usuario que está no top no array
						
	//Fim das validações
						
	conta.usuario[0].nome = nome, //trata o usuario que está no top no array			
	conta.usuario[0].data_nascimento = data_nascimento, //trata o usuario que está no top no array
	conta.usuario[0].telefone = telefone,//trata o usuario que está no top no array
	conta.usuario[0].senha = senha//trata o usuario que está no top no array

	return res.status(203).send();
}

const atualizarSenhaConta = () => {

    const { numero_conta } = req.params; 
    const { senha } = req.body;

    if(isNaN(Number(numero_conta))) {
        return res.status(400).json({ mensagem: 'Número da conta é inválido!' });
    }
	
    const conta = contas.find((conta) => {
        return Number(conta.numero_conta) === Number(numero_conta);
    });

    if(!conta) {
        return res.status(404).json({ mensagem: 'Conta não encontrada.' });
    }

    if(!senha) {
        return res.status(400).json({ mensagem: 'A senha é obrigatório '});
    }

    conta.usuario[0].senha = senha//trata o usuario que está no top no array

    return res.status(204).send();
}

const excluirConta = (req, res) => {
    const { numero_conta } = req.params;
/*
    if(isNaN(Number(numero_conta))) {
        return res.status(400).json({ mensagem: 'Número da conta é inválido!' });
    }
*/	
    const conta = contas.find((conta) => {
        return Number(conta.numero_conta) === Number(numero_conta);
    });

    if(!conta) {
        return res.status(404).json({ mensagem: 'Conta não encontrada.' });
    }

    if(conta.saldo > 0) {
		return res.status(400).json({ mensagem: 'A conta só pode ser removida se o saldo for zero!' });
    }
	
    contas = contas.filter((conta) => {
        return Number(conta.numero_conta) != Number(numero_conta);
    });

    return res.status(204).send();
}

module.exports = {
    listarUsuarios,
    //obterConta,
    //criarConta,
	//atualizarConta,
    //excluirConta
}