'use client';

import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { PerfilService } from '../../../../service/PerfilService';
import { Projeto } from '@/types';

const Perfil = () => {
    const [perfis, setPerfis] = useState<Projeto.Perfil[]>([]);
    const [perfilDialog, setPerfilDialog] = useState(false);
    const [deletePerfilDialog, setDeletePerfilDialog] = useState(false);
    const [perfil, setPerfil] = useState<Projeto.Perfil>({ descricao: '' });
    const [selectedPerfis, setSelectedPerfis] = useState<Projeto.Perfil[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const toast = useRef<Toast>(null);
    const dt = useRef<DataTable<Projeto.Perfil>>(null);

    const perfilService = new PerfilService();

    useEffect(() => {
        loadPerfis();
    }, []);

    const loadPerfis = () => {
        perfilService
            .listarTodos()
            .then((response) => setPerfis(response.data))
            .catch((error) => {
                console.error('Erro ao listar perfis:', error);
                toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao carregar perfis', life: 3000 });
            });
    };

    const openNew = () => {
        setPerfil({ descricao: '' });
        setSubmitted(false);
        setPerfilDialog(true);
    };

    const hideDialog = () => {
        setSubmitted(false);
        setPerfilDialog(false);
    };

    const hideDeletePerfilDialog = () => {
        setDeletePerfilDialog(false);
    };

    const savePerfil = () => {
        setSubmitted(true);

        if (perfil.descricao.trim()) {
            if (perfil.id) {
                perfilService
                    .atualizar(perfil.id, perfil)
                    .then(() => {
                        loadPerfis();
                        hideDialog();
                        toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: 'Perfil atualizado', life: 3000 });
                    })
                    .catch((error) => {
                        console.error('Erro ao atualizar perfil:', error);
                        toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao atualizar perfil', life: 3000 });
                    });
            } else {
                perfilService
                    .inserir(perfil)
                    .then(() => {
                        loadPerfis();
                        hideDialog();
                        toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: 'Perfil criado', life: 3000 });
                    })
                    .catch((error) => {
                        console.error('Erro ao inserir perfil:', error);
                        toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar perfil', life: 3000 });
                    });
            }
            setPerfil({ descricao: '' });
        }
    };

    const editPerfil = (perfil: Projeto.Perfil) => {
        setPerfil({ ...perfil });
        setPerfilDialog(true);
    };

    const confirmDeletePerfil = (perfil: Projeto.Perfil) => {
        setPerfil(perfil);
        setDeletePerfilDialog(true);
    };

    const deletePerfil = () => {
        perfilService
            .deletar(perfil.id!)
            .then(() => {
                loadPerfis();
                hideDeletePerfilDialog();
                toast.current?.show({ severity: 'success', summary: 'Sucesso', detail: 'Perfil excluído', life: 3000 });
            })
            .catch((error) => {
                console.error('Erro ao excluir perfil:', error);
                toast.current?.show({ severity: 'error', summary: 'Erro', detail: 'Erro ao excluir perfil', life: 3000 });
            });
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>, name: string) => {
        const val = (e.target && e.target.value) || '';
        setPerfil({ ...perfil, [name]: val });
    };

    const deletePerfilDialogFooter = (
        <>
            <Button label="Não" icon="pi pi-times" className="p-button-text" onClick={hideDeletePerfilDialog} />
            <Button label="Sim" icon="pi pi-check" className="p-button-text" onClick={deletePerfil} />
        </>
    );

    const perfilDialogFooter = (
        <>
            <Button label="Cancelar" icon="pi pi-times" className="p-button-text" onClick={hideDialog} />
            <Button label="Salvar" icon="pi pi-check" className="p-button-text" onClick={savePerfil} />
        </>
    );

    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                <h1>CADASTRO DE PERFIL</h1>
                <Button icon="pi pi-plus" className="p-button-success mr-2" label="Novo" onClick={openNew} />

                <DataTable ref={dt} value={perfis} selection={selectedPerfis} onSelectionChange={(e) => setSelectedPerfis(e.value)} dataKey="id" rows={10} paginator rowsPerPageOptions={[5, 10, 25]}>
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }}></Column>
                    <Column field="descricao" header="Descrição" sortable></Column>
                    <Column
                        body={(rowData) => (
                            <>
                                <Button icon="pi pi-pencil" className="p-button-rounded p-button-success mr-2" onClick={() => editPerfil(rowData)} />
                                <Button icon="pi pi-trash" className="p-button-rounded p-button-warning" onClick={() => confirmDeletePerfil(rowData)} />
                            </>
                        )}
                    ></Column>
                </DataTable>

                <Dialog visible={perfilDialog} style={{ width: '450px' }} header="Detalhes do Perfil" modal className="p-fluid" footer={perfilDialogFooter} onHide={hideDialog}>
                    <div className="field">
                        <label htmlFor="descricao">Descrição</label>
                        <InputText id="descricao" value={perfil.descricao} onChange={(e) => onInputChange(e, 'descricao')} required autoFocus className="p-invalid" />
                        {submitted && !perfil.descricao && <small className="p-error">Descrição é obrigatória.</small>}
                    </div>
                </Dialog>

                <Dialog visible={deletePerfilDialog} style={{ width: '450px' }} header="Confirmar Exclusão" modal footer={deletePerfilDialogFooter} onHide={hideDeletePerfilDialog}>
                    <div className="flex align-items-center justify-content-center">
                        <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                        {perfil && (
                            <span>
                                Tem certeza que deseja excluir <b>{perfil.descricao}</b>?
                            </span>
                        )}
                    </div>
                </Dialog>
            </div>
        </div>
    );
};

export default Perfil;
