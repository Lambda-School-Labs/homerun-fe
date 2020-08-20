import React, { useState, useEffect } from 'react';
import Name from './Name';

import { useSelector, useDispatch } from 'react-redux';
import actions from '../../actions/index';

// Since this component itself is named List i had to import Semantic Ui's List component as UiList
import { Button, Form, Modal, List as UiList } from 'semantic-ui-react';
import InviteMember from './InviteMember.js';
import EditPermissions from './EditPermissions.js';

const List = () => {
  const [memberModal, setMemberModal] = useState(false);
  const [permissionsModal, setPermissionsModal] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState('');

  const handleEdit = (e, member) => {
    setPermissionsModal(true);
    e.preventDefault();
    setMemberToEdit(member);
  };

  const household = useSelector((state) => state.household);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.houseHold.fetchHousehold());
  }, [dispatch]);

  return (
    <div data-testid="list">
      <UiList selection verticalAlign="middle">
        {household.members.map((member) => {
          return (
            <div key={member.username} className="flex justify-between">
              <Name name={member.username} />
              <div key={member.username} className="flex">
                <label className="edit-level-label">Level</label>
                <span className="original-level">
                  {member.permission_level}
                </span>
                <Modal
                  open={permissionsModal}
                  onClose={() => setPermissionsModal(false)}
                  trigger={
                    <i
                      className="ui icon edit large blue todo-icon edit-permissions"
                      onClick={(e) => handleEdit(e, member)}
                    ></i>
                  }
                  content={
                    <EditPermissions
                      setModal={setPermissionsModal}
                      key={member.username}
                      member={member}
                      memberToEdit={memberToEdit}
                    />
                  }
                ></Modal>{' '}
              </div>
            </div>
          );
        })}
      </UiList>
      <Modal
        open={memberModal}
        onClose={() => setMemberModal(false)}
        trigger={
          <Button
            onClick={() => setMemberModal(true)}
            className="w-full invite-button"
          >
            Invite Member
          </Button>
        }
        content={<InviteMember setModal={setMemberModal} />}
      ></Modal>
    </div>
  );
};

export default List;
