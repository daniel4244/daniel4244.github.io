package BibliotecaPackage;

public class Assunto {
	private String nome;
	
	public Assunto() {
		
	}
	
	public Assunto(String nome) {
		this();
		this.setNome(nome);
	}

	public String getNome() {
		return this.nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
}
