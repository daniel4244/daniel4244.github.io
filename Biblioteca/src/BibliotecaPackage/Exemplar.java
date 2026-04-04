package BibliotecaPackage;

public class Exemplar {
	private Livro livro = new Livro();
	private Status status;
	
	public Exemplar() {
		
	}
	
	public Exemplar(Livro livro) {
		this();
		this.setLivro(livro);
	}
	
	public Exemplar(Livro livro, Status status) {
		this(livro);
		this.setStatus(status);
	}
	
	public Livro getLivro() {
		return livro;
	}
	public void setLivro(Livro livro) {
		this.livro = livro;
	}
	
	public Status getStatus() {
		return status;
	}
	
	public void setStatus(Status status) {
		this.status = status;
	}
	
	public void mostraDados() {
		System.out.println("Título do Exemplar: " + this.livro.getTitulo());
		System.out.println("Status: " + this.status);
	}
}
