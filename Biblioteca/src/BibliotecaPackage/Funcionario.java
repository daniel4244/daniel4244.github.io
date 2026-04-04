package BibliotecaPackage;

public class Funcionario {
	private String nome;
	
	public Funcionario() {
		
	}
	
	public Funcionario(String nome) {
		this();
		this.setNome(nome);
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
}
