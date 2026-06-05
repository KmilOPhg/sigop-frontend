import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { usuariosApi } from '../api/usuarios.api';
import { UsuariosTable } from '../components/usuarios/UsuariosTable';
import { CreateUsuarioModal } from '../components/usuarios/CreateUsuarioModal';
import { EditUsuarioModal } from '../components/usuarios/EditUsuarioModal';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { usePageTitle } from '../hooks/usePageTitle';
import type { Usuario, Rol } from '../types/usuario.types';

interface PermisoItem {
    id: number;
    codigo: string;
    nombre: string;
    modulo: string;
}

export function UsuariosPage() {
    usePageTitle('Usuarios');
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [roles, setRoles] = useState<Rol[]>([]);
    const [permisosAgrupados, setPermisosAgrupados] = useState<Record<string, PermisoItem[]>>({});
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [editUsuario, setEditUsuario] = useState<Usuario | null>(null);

    const fetchUsuarios = async () => {
        try {
            const res = await usuariosApi.listar();
            setUsuarios(res.data.data);
        } catch {
            toast.error('Error al cargar usuarios');
        }
    };

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                const [usuariosRes, rolesRes, permisosRes] = await Promise.all([
                    usuariosApi.listar(),
                    usuariosApi.listarRoles(),
                    usuariosApi.listarPermisos(),
                ]);
                setUsuarios(usuariosRes.data.data);
                setRoles(rolesRes.data.data);
                setPermisosAgrupados(permisosRes.data.data);
            } catch {
                toast.error('Error al cargar datos');
            } finally {
                setLoading(false);
            }
        };
        init();
    }, []);

    return (
        <div className="space-y-6">
            <PageHeader
                section="Administración"
                title="Gestión de Usuarios"
                action={
                    <Button icon="person_add" onClick={() => setShowCreate(true)}>
                        Crear Usuario
                    </Button>
                }
            />

            {loading ? (
                <div className="bg-surface-container-low rounded-xl h-64 animate-pulse" />
            ) : (
                <UsuariosTable
                    usuarios={usuarios}
                    onEdit={(u) => setEditUsuario(u)}
                    onRefresh={fetchUsuarios}
                />
            )}

            <CreateUsuarioModal
                isOpen={showCreate}
                onClose={() => setShowCreate(false)}
                onCreated={fetchUsuarios}
                roles={roles}
                permisosAgrupados={permisosAgrupados}
            />

            <EditUsuarioModal
                isOpen={!!editUsuario}
                onClose={() => setEditUsuario(null)}
                onUpdated={fetchUsuarios}
                usuario={editUsuario}
                roles={roles}
                permisosAgrupados={permisosAgrupados}
            />
        </div>
    );
}
