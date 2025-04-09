'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { RecursoService } from '../../../../service/RecursoService';
import { Projeto } from '@/types';

const RecursoCrud = () => {
    const [recursos, setRecursos] = useState<Projeto.Recurso[]>([]);
    const [recursoDialog, setRecursoDialog] = useState(false);
    const [deleteRecursoDialog, setDeleteRecursoDialog] = useState(false);
    const [recurso, setRecurso] = useState<Projeto.Recurso>({ nome: '', chave: '' });
    const [selectedRecursos, setSelectedRecursos] = useState<Projeto.Recurso[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<Projeto.Recurso>>(null);

    const recursoService = new RecursoService();

    useEffect(() => {
        loadRecursos();
    }, []);

    const loadRecursos = () => {
        recursoService
            .listarTodos()
            .then((response) => setRecursos(response.data))
            .catch((error) => {
                console.error('Erro ao listar recursos:', error);
                toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar recursos', life: 3000 });
            });
    };

    const openNew = () => {
        setRecurso({ nome: '', chave: '' });
        setSubmitted(false);
        setRecursoDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setRecursoDialog(false);
    };

    const hideDeleteRecursoDialog = () => {
        setDeleteRecursoDialog(false);
    };

    const saveRecurso = () => {
        setSubmitted(true);

        if (recurso.nome.trim() && recurso.chave.trim()) {
            if (recurso.id) {
                console.log('Atualizando recurso:', recurso); // Adicione este log
                recursoService
                    .atualizar(recurso.id, recurso)
                    .then((response) => {
                        console.log('Resposta da API:', response.data); // Adicione este log
                        setRecursos((prevRecursos) => (prevRecursos || []).map((r) => (r.id === recurso.id ? response.data : r)));
                        hideDialog();
                        toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: 'Recurso atualizado', life: 3000 });
                    })
                    .catch((error) => {
                        console.error('Erro ao atualizar recurso:', error);
                        toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar recurso', life: 3000 });
                    });
            } else {
                recursoService
                    .inserir(recurso)
                    .then((response) => {
                        setRecursos((prevRecursos) => (prevRecursos || []).concat(response.data));
                        hideDialog();
                        toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: 'Recurso criado', life: 3000 });
                    })
                    .catch((error) => {
                        console.error('Erro ao inserir recurso:', error);
                        toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar recurso', life: 3000 });
                    });
            }
            setRecurso({ nome: '', chave: '' });
        }
    };

    const editRecurso = (recurso: Projeto.Recurso) => {
        setRecurso({ ...recurso });
        setRecursoDialog(true);
    };

    const confirmDeleteRecurso = (recurso: Projeto.Recurso) => {
        setRecurso(recurso);
        setDeleteRecursoDialog(true);
    };

    const deleteRecurso = () => {
        recursoService
            .deletar(recurso.id!)
            .then(() => {
                loadRecursos();
                hideDeleteRecursoDialog();
                toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: 'Recurso excluído', life: 3000 });
            })
            .catch((error) => {
                console.error('Erro ao excluir recurso:', error);
                toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir recurso', life: 3000 });
            });
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        setRecurso({ ...recurso, [name]: val });
    };

    const deleteRecursoDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={hideDeleteRecursoDialog} />
            <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={deleteRecurso} />
        </>
    );

    const recursoDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" className="p-button-text" onClick={saveRecurso} />
        </>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <h1>CADASTRO DE RECURSO</h1>
                <Button icon="pi pi-plus" className="p-button-success mr-2" label="Novo" onClick={openNew} />

                <DataTable ref={dt} value={recursos} selection={selectedRecursos} onSelectionChange={(e) => setSelectedRecursos(e.value)} dataKey="id" rows={10} paginator rowsPerPageOptions={[5, 10, 25]}>
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="nome" header="Nome" sortable></Column>
                    <Column field="chave" header="Chave" sortable></Column>
                    <Column
                        body={(rowData) => (
                            <>
                                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editRecurso(rowData)} />
                                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeleteRecurso(rowData)} />
                            </>
                        )}
                    ></Column>
                </DataTable>

                <Dialog visible={recursoDialog} style={{ width: '450px' }} header="Detalhes do Recurso" modal className="p-fluid" footer={recursoDialogFooter} onHide={hideDialog}>
                    <div className="field">
                        <label htmlFor="nome">Nome</label>
                        <InputText id="nome" value={recurso.nome} onChange={(e) => onInputChange(e, 'nome')} required autoFocus className="p-invalid" />
                        {submitted && !recurso.nome && <small className="p-error">Nome é obrigatório.</small>}
                    </div>
                    <div className="field">
                        <label htmlFor="chave">Chave</label>
                        <InputText id="chave" value={recurso.chave} onChange={(e) => onInputChange(e, 'chave')} required className="p-invalid" />
                        {submitted && !recurso.chave && <small className="p-error">Chave é obrigatória.</small>}
                    </div>
                </Dialog>

                <Dialog visible={deleteRecursoDialog} style={{ width: '450px' }} header="Confirmar Exclusão" modal footer={deleteRecursoDialogFooter} onHide={hideDeleteRecursoDialog}>
                    <div className="flex align-items-center justify-content-center">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {recurso && (
                            <span>
                                Tem certeza que deseja excluir <b>{recurso.nome}</b>?
                            </span>
                        )}
                    </div>
                </Dialog>
            </div>
        </div>
    );
};

export default RecursoCrud;
