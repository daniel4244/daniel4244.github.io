package BibliotecaPackage;

public class Editora {
	private String nome;

	public Editora() {
		
	}
	
	public Editora(String nome) {
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
