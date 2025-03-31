'use client';
import { UsuarioService } from '@/service/UsuarioService';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Dialog } from 'primereact/dialog';
import { FileUpload } from 'primereact/fileupload';
import { InputText } from 'primereact/inputtext';

import { Toast } from 'primereact/toast';
import { Toolbar } from 'primereact/toolbar';
import { classNames } from 'primereact/utils';
import React, { useEffect, useRef, useState } from 'react';

const Crud = () => {
    let usuarioVazio: Projeto.Usuario = {
        id: 0,
        nome: '',
        login: '',
        senha: '',
        email: ''
    };

    const [usuarios, setUsuarios] = useState<Projeto.Usuario[] | null>(null);
    const [usuarioDialog, setUsuarioDialog] = useState(false);
    const [deleteUsuarioDialog, setDeleteUsuarioDialog] = useState(false);
    const [deleteUsuariosDialog, setDeleteUsuariosDialog] = useState(false);
    const [usuario, setUsuario] = useState<Projeto.Usuario>(usuarioVazio);
    const [selectedUsuarios, setSelectedUsuarios] = useState<Projeto.Usuario[] | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState('');
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<any>>(null);
    const usuarioService = new UsuarioService();

    useEffect(() => {
        // Simulating fetching data from an API
        // In a real application, you would replace this with an API call to fetch the users
        usuarioService
            .listarTodos()
            .then((response) => {
                console.log('Response:', response.data); // Log the response data
                setUsuarios(response.data); // Set the users state with the response data
            })
            .catch((error) => {
                console.error('Error fetching users:', error); // Log any errors
            });

        setUsuarios([{ id: 1, nome: 'Karim Benzema', login: 'benzema9', senha: 'gol123', email: 'benzema@realmadrid.com' }]);
    }, []);

    const openNew = () => {
        setUsuario(usuarioVazio);
        setSubmitted(false);
        setUsuarioDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setUsuarioDialog(false);
    };

    const hideDeleteUsuarioDialog = () => {
        setDeleteUsuarioDialog(false);
    };

    const hideDeleteUsuariosDialog = () => {
        setDeleteUsuariosDialog(false);
    };

    const saveUsuario = () => {
        setSubmitted(true);

        if (!usuario.id) {
            // Criar novo usuário
            usuarioService
                .inserir(usuario)
                .then((response) => {
                    setUsuarios(
                        (prevUsuarios) => (prevUsuarios || []).map((u) => (u.id === usuario.id ? response.data : u)) // Atualiza o usuário na lista
                    );
                    setUsuarioDialog(false);
                    setUsuario(usuarioVazio);
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Usuário Criado',
                        life: 3000
                    });
                })
                .catch((error) => {
                    console.log(error);
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Erro ao criar usuário',
                        life: 3000
                    });
                });
        } else {
            // Atualizar usuário existente
            usuarioService
                .atualizar(usuario.id, usuario)
                .then((response) => {
                    setUsuarios(
                        (prevUsuarios) => (prevUsuarios || []).map((u) => (u.id === usuario.id ? response.data : u)) // Atualiza o usuário na lista
                    );
                    setUsuarioDialog(false);
                    setUsuario(usuarioVazio);
                    toast.current?.show({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Usuário Atualizado',
                        life: 3000
                    });
                })
                .catch((error) => {
                    console.log(error);
                    toast.current?.show({
                        severity: 'error',
                        summary: 'Error',
                        detail: 'Erro ao atualizar usuário',
                        life: 3000
                    });
                });
        }
    };

    const editUsuario = (usuario: Projeto.Usuario) => {
        setUsuario({ ...usuario });
        setUsuarioDialog(true);
    };

    const confirmDeleteUsuario = (usuario: Projeto.Usuario) => {
        setUsuario(usuario);
        setDeleteUsuarioDialog(true);
    };

    const deleteUsuario = () => {
        usuarioService
            .deletar(usuario.id!)
            .then(() => {
                let _usuarios = (usuarios || []).filter((val) => val.id !== usuario.id);
                setUsuarios(_usuarios);
                setDeleteUsuarioDialog(false);
                setUsuario(usuarioVazio);
                toast.current?.show({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Usuário Deletado',
                    life: 3000
                });
            })
            .catch((error) => {
                console.error('Error deleting user:', error);
                toast.current?.show({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Erro ao deletar usuário',
                    life: 3000
                });
            });
    };
    const findIndexById = (id: number) => {
        let index = -1;
        for (let i = 0; i < (usuarios || []).length; i++) {
            if ((usuarios || [])[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    };

    const createId = () => {
        return Math.floor(Math.random() * 10000);
    };

    const exportCSV = () => {
        dt.current?.exportCSV();
    };

    const confirmDeleteSelected = () => {
        setDeleteUsuariosDialog(true);
    };

    const deleteSelectedUsuarios = () => {
        let _usuarios = (usuarios || []).filter((val) => !(selectedUsuarios || []).includes(val));
        setUsuarios(_usuarios);
        setDeleteUsuariosDialog(false);
        setSelectedUsuarios(null);
        toast.current?.show({
            severity: 'success',
            summary: 'Successful',
            detail: 'Usuários Deletados',
            life: 3000
        });
    };

    const onInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        nome: keyof Projeto.Usuario // Restrict to valid keys of Projeto.Usuario
    ) => {
        const val = e.target.value || '';
        setUsuario((prevUsuario) => ({
            ...prevUsuario,
            [nome]: val // TypeScript now knows 'nome' is a valid key
        }));
    };

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <div className="my-2">
                    <Button label="Novo" icon="pi pi-plus" severity="success" className=" mr-2" onClick={openNew} />
                    <Button label="Deletar" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selectedUsuarios || !selectedUsuarios.length} />
                </div>
            </React.Fragment>
        );
    };

    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} chooseLabel="Importar" className="mr-2 inline-block" />
                <Button label="Exportar" icon="pi pi-upload" severity="help" onClick={exportCSV} />
            </React.Fragment>
        );
    };

    const header = (
        <div className="flex flex-column md:flex-row md:justify-content-between md:align-items-center">
            <h5 className="m-0">Gerenciar Usuários</h5>
            <span className="block mt-2 md:mt-0 p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder="Pesquisar..." />
            </span>
        </div>
    );

    const usuarioDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" text onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" text onClick={saveUsuario} />
        </>
    );
    const deleteUsuarioDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeleteUsuarioDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deleteUsuario} />
        </>
    );
    const deleteUsuariosDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" text onClick={hideDeleteUsuariosDialog} />
            <Button label="Sim" icon="pi pi-check" text onClick={deleteSelectedUsuarios} />
        </>
    );

    return (
        <div className="grid crud-demo">
            <div className="col-12">
                <div className="card">
                    <Toast ref={toast} />
                    <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>

                    <DataTable
                        ref={dt}
                        value={usuarios}
                        selection={selectedUsuarios}
                        onSelectionChange={(e) => setSelectedUsuarios(e.value as any)}
                        dataKey="id"
                        paginator
                        rows={10}
                        rowsPerPageOptions={[5, 10, 25]}
                        className="datatable-responsive"
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} usuários"
                        globalFilter={globalFilter}
                        emptyMessage="Nenhum usuário encontrado."
                        header={header}
                        responsiveLayout="scroll"
                    >
                        <Column selectionMode="multiple" headerStyle={{ width: '4rem' }}></Column>
                        <Column field="id" header="ID" sortable></Column>
                        <Column field="nome" header="Nome" sortable></Column>
                        <Column field="login" header="Login" sortable></Column>
                        <Column field="email" header="Email" sortable></Column>
                        <Column
                            body={(rowData) => (
                                <>
                                    <Button icon="pi pi-pencil" rounded severity="success" className="mr-2" onClick={() => editUsuario(rowData)} />
                                    <Button icon="pi pi-trash" rounded severity="warning" onClick={() => confirmDeleteUsuario(rowData)} />
                                </>
                            )}
                        ></Column>
                    </DataTable>

                    <Dialog visible={usuarioDialog} style={{ width: '450px' }} header="Detalhes do Usuário" modal className="p-fluid" footer={usuarioDialogFooter} onHide={hideDialog}>
                        <div className="field">
                            <label htmlFor="nome">Nome</label>
                            <InputText
                                id="nome"
                                value={usuario.nome}
                                onChange={(e) => onInputChange(e, 'nome')}
                                required
                                autoFocus
                                className={classNames({
                                    'p-invalid': submitted && !usuario.nome
                                })}
                            />
                            {submitted && !usuario.nome && <small className="p-invalid">Nome é obrigatório.</small>}
                        </div>
                        <div className="field">
                            <label htmlFor="login">Login</label>
                            <InputText id="login" value={usuario.login} onChange={(e) => onInputChange(e, 'login')} required />
                        </div>
                        <div className="field">
                            <label htmlFor="email">Email</label>
                            <InputText id="email" value={usuario.email} onChange={(e) => onInputChange(e, 'email')} required />
                        </div>
                        <div className="field">
                            <label htmlFor="senha">Senha</label>
                            <InputText id="senha" value={usuario.senha} onChange={(e) => onInputChange(e, 'senha')} required type="password" />
                        </div>
                    </Dialog>

                    <Dialog visible={deleteUsuarioDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteUsuarioDialogFooter} onHide={hideDeleteUsuarioDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {usuario && (
                                <span>
                                    Tem certeza que deseja deletar o usuário <b>{usuario.nome}</b>?
                                </span>
                            )}
                        </div>
                    </Dialog>

                    <Dialog visible={deleteUsuariosDialog} style={{ width: '450px' }} header="Confirmar" modal footer={deleteUsuariosDialogFooter} onHide={hideDeleteUsuariosDialog}>
                        <div className="flex align-items-center justify-content-center">
                            <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                            {selectedUsuarios && <span>Tem certeza que deseja deletar os usuários selecionados?</span>}
                        </div>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};

export default Crud;
