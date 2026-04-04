package BibliotecaPackage;
import java.util.ArrayList; 

public class Livro {
	
	private String titulo;
	private String anoPublicado; 
	private Editora editora = new Editora();
	private Assunto assunto = new Assunto();
	private ArrayList<Autor> autores = new ArrayList<Autor>();
	
	public Livro() {
		
	}
	
	public Livro(String titulo) {
		this();
		this.setTitulo(titulo);
	}
	
	public Livro(String titulo, String anoPublicado) {
		this(titulo);
		this.setAnoPublicado(anoPublicado);
	}
	
	public Livro(String titulo, String anoPublicado, Editora editora) {
		this(titulo, anoPublicado);
		this.setEditora(editora);
	}
	
	public Livro(String titulo, String anoPublicado, Editora editora, Assunto assunto) {
		this(titulo, anoPublicado, editora);
		this.setAssunto(assunto);
	}
	
	public String getTitulo() {
		return this.titulo;
	}
	
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}
	
	public String getAnoPublicado() {
		return this.anoPublicado;
	}
	
	public void setAnoPublicado(String anoPublicado) {
	    if(anoPublicado.length() != 4)
	        return;
		this.anoPublicado = anoPublicado;
	}
	
	public Editora getEditora() {
		return this.editora;
	}
	
	public void setEditora(Editora editora) {
		this.editora = editora;
	}
	
	public Assunto getAssunto() {
		return this.assunto;
	}
	
	public void setAssunto(Assunto assunto) {
		this.assunto = assunto;
	}
	
	public void adicionarAutor(Autor autor) {
		this.autores.add(autor);
	}
	
	public Autor getAutor(int posicao) {
		return this.autores.get(posicao);
	}

	public ArrayList<Autor> getAutores(){
		return this.autores;
	}
	
	public void mostrarDados() {
		System.out.println("Título: " + this.titulo);
		System.out.println("Ano de Publicação: " + this.anoPublicado);
		System.out.println("Editora: " + this.editora.getNome());
		System.out.println("Autores: ");
		for(Autor a : this.autores) {
			System.out.println(" - " + a.getNome());
		}
	}
}
